import { DetailsComponent } from './components/company.details';
import { ListComponent } from './components/companies.list';

export const routesConfig = [
  {
    path: 'companies',
    component: ListComponent
  },
  {
    path: 'companies/:id',
    component: DetailsComponent
  }
];
