import { Navigate, useRoutes } from 'react-router-dom';
import { PetsInsurancePage, PetsInsuranceList, PetsInsuranceAdd } from './PetsInsurance'


export default function useAppRoutes() {
  return useRoutes([
    {
      path: 'petInsurnace',
      element: <PetsInsurancePage />,
      children: [
        {
          path: '',
          element: <PetsInsuranceList />,
        },
        {
          path: 'add',
          element: <PetsInsuranceAdd />,
        },
        // {
        //   path: ':id',
        //   element: <TemplateEditPage />,
        // },
        // {
        //   path: 'new',
        //   element: <TemplateEditPage isNew />,
        // },
      ],
    },
    // {
    //   path: 'rsTemplate',
    //   element: <RsTemplatePage />,
    //   children: [
    //     {
    //       path: '',
    //       element: <RsTemplateListPage />,
    //     },
    //     {
    //       path: ':id',
    //       element: <RsTemplateEditPage />,
    //     },
    //     {
    //       path: 'new',
    //       element: <RsTemplateEditPage isNew />,
    //     },
    //   ],
    // },
    // {
    //   path: 'resource',
    //   element: <ResourcePage />,
    //   children: [
    //     {
    //       path: '',
    //       element: <ResourceListPage />,
    //     },
    //     {
    //       path: 'assets/:libraryId',
    //       element: <AssetPage />,
    //     },
    //     {
    //       path: 'font',
    //     },
    //   ],
    // },
    // {
    //   path: 'material',
    //   element: <MaterialPage />,
    //   children: [
    //     {
    //       path: '',
    //       element: <MaterialListPage />,
    //     },
    //     {
    //       path: ':id',
    //       element: <MaterialEditPage />,
    //     },
    //     {
    //       path: 'new/:templateId',
    //       element: <MaterialAddPage />,
    //     },
    //   ],
    // },
    { path: '*', element: <Navigate to="petInsurnace" replace /> },
  ]);
}
