import { ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {ErrorComponent} from './404/404.component';
import {MenuComponent} from './menu/menu.component';

const routes: Routes = [

    {path:'escuela',component:MenuComponent},
    {path:'**',component:ErrorComponent}
   ];
   
   export const AppRoutinProviders: any[]=[];
   export const routing: ModuleWithProviders <any> = RouterModule.forRoot(routes);
