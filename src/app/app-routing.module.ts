import { NgModule } from '@angular/core';
import { NoPreloading, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NetworkAwarePreloadStrategy } from './preloading-strategies/network-aware-preloading-strategy';
import { OnDemandPreloadingStrategy } from './preloading-strategies/on-demand-preloading-strategy';
import { OptInPreloadingStrategy } from './preloading-strategies/opt-in-preloading-strategy';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'auth',
    loadChildren: ()=> import('./modules/pages/auth/auth.module').then(m => m.AuthModule),
    data: {
      preload: true // Este módulo se va a precargar bajo la estrategia OptInStrategy / OnDemand
    }
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'profile',
    loadChildren: ()=> import('./modules/pages/profile/profile.module').then(m => m.ProfileModule),
    data: {
      preload: true // Este módulo se va a precargar bajo la estrategia OptInStrategy / OnDemand
    }
  },
  {
    //Siempre el 404 se pondrá en el módulo de enrutado principal
    path: '**', //El path con los 2 asteriscos para hacer la carga de un 404 
    loadChildren: () => import('./modules/pages/not-found/not-found.module').then(m => m.NotFoundModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      // * 1 - PRECARGA TODOS LOS MÓDULOS DE LAS RUTAS --> Evitar carga perezosa 
      // preloadingStrategy: PreloadAllModules
      // * 2 - NO PRECARGA NINGÚN MÓDULO --> Forzar carga perezosa
      // preloadingStrategy: NoPreloading
      // * 3 - Estrategia personalizada de Precarga por opciones en ruta
      // preloadingStrategy: OptInPreloadingStrategy
      // * 4 - Estrategia personalizada de Precarga por conexión a internet
      // preloadingStrategy: NetworkAwarePreloadStrategy
      // * 5 - Estrategia personalizada de Precarga por Demanda iniciada por evento controlado desde Servicio PreloadingService
      preloadingStrategy: OnDemandPreloadingStrategy
    }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
