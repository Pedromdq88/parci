import { Routes } from '@angular/router';
import { List } from './pages/list/list';
import { Detail } from './pages/detail/detail';
import { Form } from './pages/form/form';

export const routes: Routes = [

    {path : (""), component : List},
    {path : ("pedido/:id"), component : Detail},
    {path : ("form"), component : Form},

];
