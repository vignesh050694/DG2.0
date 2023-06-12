import { Component, OnInit } from "@angular/core";
import { NavServiceService } from "./nav-service.service";

export const navItems = [
  {
    title: "Dashboard",
    id: "dashboard",
    activeIcon: "assets/images/icons/dashboard-white-ico.png",
    icon: "assets/images/icons/dashboard-ico.png",
    link: "/dashboard",
    child: null
  },
  {
    title: "Master Data",
    id: "master-data",
    activeIcon: "assets/images/icons/masterdata-white-ico.png",
    icon: "assets/images/icons/masterdata-ico.png",
    child: [
      {
        title: "Season",
        link: "/master/season",
      },
      {
        title: "Crop",
        link: "/master/crop",
      },
      {
        title: "Farm Input",
        link: "/master/farm-input",
      },
      {
        title: "Farmer",
        link: "/master/farmer",
      },
      {
        title: "Vendor",
        link: "/master/vendors",
      },
      {
        title: "Buyers",
        link: "/master/buyer",
      },
      {
        title: "Warehouse",
        link: "/master/warehouse",
      },
      {
        title: "Catalogue",
        link: "/master/catalogue",
      },
      {
        title: "Training",
        link: "/master/training",
      },
      {
        title: "Location",
        link: "/master/location"
      }
    ]
  },
  {
    title: "Settings",
    id: "settings-data",
    activeIcon: "assets/images/icons/profile-white-ico.png",
    icon: "assets/images/icons/profile-ico.png",
    child: [
      {
        title: "Group",
        link: "/settings/group",
      },
      {
        title: "Mobile User",
        link: "/settings/mobile-user",
      },
      {
        title: "Device",
        link: "/settings/device",
      },
      {
        title: "User",
        link: "/settings/user",
      },
      {
        title: "Role",
        link: "/settings/role",
      },
      {
        title: "Settings",
        link: "/settings/setting",
      },
      {
        title: "Organization",
        link: "/settings/organization",
      },
    ]
  }
];
export const navProdItems = [
  {
    title: "Dashboard",
    id: "dashboard",
    activeIcon: "assets/images/icons/dashboard-white-ico.png",
    icon: "assets/images/icons/dashboard-ico.png",
    link: "/dashboard"
  },
  {
    title: "Master Data",
    id: "master-data",
    activeIcon: "assets/images/icons/masterdata-white-ico.png",
    icon: "assets/images/icons/masterdata-ico.png",
    child: [
      {
        title: "Season",
        link: "/master/season",
      },
      {
        title: "Crop",
        link: "/master/crop",
      },
      {
        title: "Farm Input",
        link: "/master/farm-input",
      },
      {
        title: "Vendor",
        link: "/master/vendors",
      },
      {
        title: "Buyers",
        link: "/master/buyer",
      },
      {
        title: "Warehouse",
        link: "/master/warehouse",
      },
      {
        title: "Catalogue",
        link: "/master/catalogue",
      },
      {
        title: "Location",
        link: "/master/location"
      },
      {
        title: "Training",
        link: "/master/training",
      }
    ]
  },
    {
    title: "Farmer",
    id: "farmer-data",
    activeIcon: "assets/images/icons/farmer-white-ico.png",
    icon: "assets/images/icons/farmer-ico.png",
    child: [
      // {
      //   title: "Farmer",
      //   link: "/report/farmer",
      // },
      {
        title: "Farmer",
        link: "/farmer/static-farmer-create",
      },
      {
        title: "Farm",
        link: "/farmer/static-farm",
      },
      {
        title: "Sowing",
        link: "/farmer/static-sowing",
      },
      {
        title: "Farmer Location",
        link: "/farmer/farm-location",
      },
      {
        title: "Payment",
        link: "/farmer/payment",
      },
      {
        title: "Cash Distribution",
        link: "/farmer/cash-distribution",
      }
    ]
  },
  {
    title: "Inventory",
    id: "inventory-data",
    activeIcon: "assets/images/icons/inventory-white-ico.png",
    icon: "assets/images/icons/inventory-ico.png",
    child: [
      {
        title: "Warehouse Stock Entry",
        link: "/inventory/warehouse-stock",
      },
      {
        title: "Distribution To MobileUser",
        link: "/inventory/distribution-to-mobile-user",
      },
      {
        title: "Distribution To Farmer",
        link: "/inventory/distribution-to-farmer",
      },
      {
        title: "Product Return To MobileUser",
        link: "/inventory/product-return-mobile-user",
      },
      {
        title: "Distribution To Transfer",
        link: "/inventory/distribution-stock-transfer",
      },
      {
        title: "Distribution To Reception",
        link: "/inventory/distribution-stock-reception",
      },
      {
        title: "Product Return To Farmer",
        link: "/inventory/product-return-farmer",
      },
      {
        title: "Loan Disbursement",
        link: "/inventory/loan-disbursement",
      },
    ]
  },
  {
    title: "Procurement",
    id: "procurement-data",
    activeIcon: "assets/images/icons/procurement-white-ico.png",
    icon: "assets/images/icons/procurement-ico.png",
    child: [
      {
        title: "Procurement",
        link: "/procurement/procurement",
      },
      {
        title: "Product Transfer",
        link: "/procurement/product-transfer",
      },
      {
        title: "Product Reception",
        link: "/procurement/product-reception",
      },
      {
        title: "Crop Sale",
        link: "/procurement/crop-sale",
      },
      {
        title: "Crop Harvest",
        link: "/procurement/crop-harvest",
      },

    ]
  },
  {
    title: "Reports",
    id: "report-data",
    activeIcon: "assets/images/icons/reports-white-ico.png",
    icon: "assets/images/icons/reports-ico.png",
    child: [
      {
        title: "Warehouse Stock",
        link: "/report/Warehouse_stock_Report",
      },
      {
        title: "Distribution To MobileUser",
        link: "/report/distribution_to_mobile_user_report",
      },
      {
        title: "Distribution To Farmer",
        link: "/report/distribution_to_farmer_report",
      },
      {
        title: "Product Return: MobileUser",
        link: "/report/product_return_mobile_user_report",
      },
      {
        title: "Distribution To Transfer",
        link: "/report/distribution_stock_transfer_report",
      },
      {
        title: "Distribution To Reception",
        link: "/report/distribution_stock_reception_report",
      },
      {
        title: "Product Return: Farmer",
        link: "/report/product_return_farmer_report",
      },
      {
        title: "Loan Disbursement",
        link: "/report/loan_disbursement_report",
      },
        {
         title: "Procurement",
         link: "/report/Procurement_stock_Report",
       },
       {
        title: "Product Transfer",
        link: "/report/product_transfer_report",
      },
      {
        title: "Product Reception",
        link: "/report/product_reception_report",
      },
      {
        title: "Crop Sale",
        link: "/report/crop_sale_report",
      },
       {
         title: "Farmer",
         link: "/report/farmer_report",
       },
       {
        title: "Training",
        link: "/report/training_report",
      },
      {
        title: "Sensitizing",
        link: "/report/sensitizing_report",
      },
      {
        title: "Mobile user",
        link: "/report/mobile user_report",
      },
      {
        title: "Certification ",
        link: "/report/ certification_report",
      },
      {
        title: "Feild inspection",
        link: "/report/feild inspection_report",
      },
      {
        title: "Group activity",
        link: "/report/group activity_report",
      },
      {
        title: "Offline_report",
        link: "/report/offline_report",
      },
      {
        title: "Loan disbursement",
        link: "/report/loan disbursement_report",
      },
      {
        title: "Supplier procurement",
        link: "/report/supplier procurement_report",
      },
      {
        title: "Loan management",
        link: "/report/loan management_report",
      },
      {
        title: "Payment",
        link: "/report/payment_report",
      },
      {
        title: "Estimated yield",
        link: "/report/estimated yield_report",
      },
      {
        title: "Global",
        link: "/report/global_report",
      },
      {
        title: "Farm Inspection Report",
        link: "/report/farm_inspection_report",
      },
    ]
  },
  {
    title: "Settings",
    id: "settings-data",
    activeIcon: "assets/images/icons/profile-white-ico.png",
    icon: "assets/images/icons/profile-ico.png",
    child: [
      {
        title: "Group",
        link: "/settings/group",
      },
      {
        title: "Mobile User",
        link: "/settings/mobile-user",
      },
      // {
      //   title: "Device",
      //   link: "/settings/device",
      // },
      {
        title: "User",
        link: "/settings/user",
      },
      {
        title: "Role",
        link: "/settings/role",
      },
      // {
      //   title: "Settings",
      //   link: "/settings/setting",
      // },
      {
        title: "Organization",
        link: "/settings/organization",
      },

    ]
  }
  // {
  //   title: "Farmer",
  //   id: "static-farmer-data",
  //   activeIcon: "assets/images/icons/farmer-white-ico.png",
  //   icon: "assets/images/icons/farmer-ico.png",
  //   child: [
  //     {
  //       title: "Farmer",
  //       link: "/farmer/static-farmer-create",
  //     },
  //     {
  //       title: "Farm",
  //       link: "/farmer/static-farm",
  //     },
  //     {
  //       title: "Sowing",
  //       link: "/farmer/static-sowing",
  //     },
  //     {
  //       title: "Location",
  //       link: "/farmer/static-location",
  //     },

  //   ]
  // }
]



