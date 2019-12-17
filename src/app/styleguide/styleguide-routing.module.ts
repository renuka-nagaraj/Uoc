import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IGGStyleGuideComponent } from './components/iggstyle-guide/iggstyle-guide.component';
import { IGCStyleGuideComponent } from './components/igcstyle-guide/igcstyle-guide.component';
import { StylehomeComponent } from './components/stylehome/stylehome.component';
const routes: Routes = [
  {
    path: '', component: StylehomeComponent,
    children: [
      { path: '', redirectTo: 'iggsg', pathMatch: 'full' },
      { path: 'iggsg', component: IGGStyleGuideComponent },
      { path: 'igcsg', component: IGCStyleGuideComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StyleguideRoutingModule { }
