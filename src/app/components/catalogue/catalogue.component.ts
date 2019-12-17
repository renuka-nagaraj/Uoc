import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {
  marketPlaceName;
  products;
  details;
  productIdsFromDataSet: String = '';
  productTenantIds: String = '';
  marketProducts = [];
  productDetails = [];
  marketNameAndProductDetails = [];
  partnerlogo: any;
  productDomainData: any;
  constructor(private appService: DataService) { }

  ngOnInit() {
    this.productIdsFromDataSet = '';
    this.productTenantIds = '';
    this.appService.getMarketDetails().subscribe(data => {
      this.marketPlaceName = data['marketName'];
      this.appService.loadCatalogueForUser(this.marketPlaceName, 1, 'json').subscribe(
        data => {
          this.products = data;
          /*this.appService.getPartnerLogo().subscribe(data1 => {
            this.partnerlogo = 'data:image/jpeg;base64,' + data1;
            // console.log('partnerlogo', this.partnerlogo);
          });*/
          // console.log('products', this.products['body'][0].tenanticonpic);
          this.marketProducts = this.products['body'];

          for (let i = 0; i < this.marketProducts.length; i++) {
            if (this.marketProducts[i]['Status'] === 'ORDER_ITEM_DELIVERY_STAGE.PENDING') {
              this.marketProducts[i].applicationStatus = 'Applied';
            } else if (this.marketProducts[i]['Status'] === 'ORDER_ITEM_DELIVERY_STAGE.SHORTLISTED') {
              this.marketProducts[i].applicationStatus = 'Shortlisted';
            } else if (this.marketProducts[i]['Status'] === 'ORDER_ITEM_DELIVERY_STAGE.DECLINED') {
              this.marketProducts[i].applicationStatus = 'Declined';
            } else if (this.marketProducts[i]['Status'] === 'ORDER_ITEM_DELIVERY_STAGE.APPROVED') {
              this.marketProducts[i].applicationStatus = 'Approved';
            } else if (this.marketProducts[i]['Status'] == null) {
              this.marketProducts[i].applicationStatus = 'Apply Now';
            }
            this.marketProducts[i].domains = [];
          }

          console.log(this.marketProducts);
          for (let i = 0; i < data.body['length']; i++) {
            if (i === data.body['length'] - 1) {
              this.productIdsFromDataSet += data.body[i]['Product Id'];
              // this.productTenantIds += data.body[i]['tenantid'];
            } else {
              this.productIdsFromDataSet += data.body[i]['Product Id'] + ',';
              // this.productTenantIds += data.body[i]['tenantid'] + ',';
            }
            console.log(this.productIdsFromDataSet);
            // console.log(this.productTenantIds);

          }


        },
        erro => { },
        () => {
          // fetch product domains
          this.appService.fetchProductDomains(this.productIdsFromDataSet).subscribe(
            productDomainResponse => {
              console.log(productDomainResponse);
              this.productDomainData = productDomainResponse.body;
              console.log(this.productDomainData);
            },
            error => {
              console.log('error while fetching products and domain');
            },
            () => {
              for (let i = 0; i < this.marketProducts.length; i++) {
                for (let j = 0; j < this.productDomainData.length; j++) {
                  if (this.marketProducts[i]['Product Id'] === this.productDomainData[j].TargetEntityId) {
                    console.log(this.marketProducts[i]['Product Id']);
                    this.marketProducts[i].domains.push(this.productDomainData[j].DomainName);
                  }
                }
              }
              console.log(this.marketProducts);
              console.log('fun complete');
            });
          // number of products per page should be limited and pagination should be implemented over here
          for (let i = 0; i < this.marketProducts.length; i++) {
            console.log(this.marketProducts[i]['tenantid']);
            this.appService.fetchPartnerLogo(this.marketProducts[i]['tenantid']).subscribe(
              logoResponse => {
                this.marketProducts[i].partnerLogo = 'data:image/jpeg;base64,' + logoResponse;
                // console.log(logoResponse);
              }
            );
          }
          /* this.appService.fetchPartnerLogos(this.productTenantIds).subscribe(
             partnerLogoResponse => {
               console.log(partnerLogoResponse);
             }, error => {
               console.log('error occured while fetching partner logos', error);
             }, () => {
               console.log('success while fetching logos');
             }
           );*/

        }
      );
      console.log('from catalogue component', this.productDetails);
    });
  }
}
