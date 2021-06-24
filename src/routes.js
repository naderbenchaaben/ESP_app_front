/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "components/userprofile/userprofile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import AddProduct from "components/products/AddProduct.js";
import AddCategory from "components/categories/AddCategory.js";
import Clients from "components/clients/Clients.js";
import Orders from "components/orders/Orders.js";
import Pending from "components/orders/Pending";
import Processing from "components/orders/Processing";
import Order from "components/orders/Order";
import Ready from "components/orders/Ready";
import Completed from "components/orders/Completed";
import Oldclients from "components/clients/Oldclients.js";
import UpdateProduct from "components/products/UpdateProduct.js";
import Products from "components/products/products.js";
import Company from "components/company/company.js";
import Facture from "components/facture/Facture";
import Categories from "components/categories/Categories.js";
import Updatecategory from "components/categories/Updatecategory";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Tableau de bord",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/userprofile",
    name: " profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "Table List",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-paper-2",
    component: Typography,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-atom",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/AddProduct",
    name: "Ajout produit",
    icon: "nc-icon nc-bell-55",
    component: AddProduct,
    layout: "/admin",
  },
  {
    path: "/Products",
    name: "Produits",
    icon: "nc-icon nc-bell-55",
    component: Products,
    layout: "/admin",
  },
  {
    path: "/UpdateProduct",
    name: "Modifier produit",
    icon: "nc-icon nc-bell-55",
    component: UpdateProduct,
    layout: "/admin",
  },
  {
    path: "/Categories",
    name: "Categories",
    icon: "nc-icon nc-bell-55",
    component: Categories,
    layout: "/admin",
  },
  {
    path: "/AddCategory",
    name: "Ajout category",
    icon: "nc-icon nc-bell-55",
    component: AddCategory,
    layout: "/admin",
  },
  {
    path: "/Updatecategory",
    name: "Modifier categorie",
    icon: "nc-icon nc-bell-55",
    component: Updatecategory,
    layout: "/admin",
  },
  {
    path: "/company",
    name: "Entreprise",
    icon: "nc-icon nc-bell-55",
    component: Company,
    layout: "/admin",
  },
  {
    path: "/clients",
    name: "Clients",
    icon: "nc-icon nc-bell-55",
    component: Clients,
    layout: "/admin",
  },
  {
    path: "/Oldclients",
    name: "anciens clients ",
    icon: "nc-icon nc-bell-55",
    component: Oldclients,
    layout: "/admin",
  },
  {
    path: "/Orders",
    name: "commandes",
    icon: "nc-icon nc-bell-55",
    component: Orders,
    layout: "/admin",
  },
  {
    path: "/Pending",
    name: "commandes en attente",
    icon: "nc-icon nc-bell-55",
    component: Pending,
    layout: "/admin",
  },
  {
    path: "/Processing",
    name: "commandes en traitement",
    icon: "nc-icon nc-bell-55",
    component: Processing,
    layout: "/admin",
  },
  {
    path: "/Ready",
    name: "commandes pretes",
    icon: "nc-icon nc-bell-55",
    component: Ready,
    layout: "/admin",
  },
  {
    path: "/Completed",
    name: "commandes Completées",
    icon: "nc-icon nc-bell-55",
    component: Completed,
    layout: "/admin",
  },
  {
    path: "/Order",
    name: "Commande",
    icon: "nc-icon nc-bell-55",
    component: Order,
    layout: "/admin",
  },
  {
    path: "/Facture",
    name: "Facture",
    icon: "nc-icon nc-bell-55",
    component: Facture,
    layout: "/admin",
  },
];

export default dashboardRoutes;
UpdateProduct;
