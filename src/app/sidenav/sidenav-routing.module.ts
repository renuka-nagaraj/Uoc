import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidenavhomeComponent } from './components/sidenavhome/sidenavhome.component';
import { IGCStyleGuideComponent } from './components/igcstyle-guide/igcstyle-guide.component';
import { IGGStyleGuideComponent } from './components/iggstyle-guide/iggstyle-guide.component';
const routes: Routes = [ {
  path: '', component: SidenavhomeComponent,
  children: [
    { path: '', redirectTo: 'iggsg', pathMatch: 'full' },
    { path: 'iggsg', component: IGGStyleGuideComponent },
    { path: 'igcsg', component: IGCStyleGuideComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidenavRoutingModule { }
