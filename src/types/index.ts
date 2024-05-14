export type Employee = {
  id: number;
  email: string;
  name: string;
  img_url: string;
  contact_number: string;
  branch_name: string;
  role: string;
  status: string;
  dob: string;
};

export type EmployeeDisplay = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  image_url: string;
  address: string;
  contact_number: number;
  gender: string;
  dob: string;
  departments: {
    id: number;
    department_name: string;
    description: string;
  };
  roles: {
    id: number;
    role: string;
  };
};

export type DepartmentsDisplay = {
  id: number;
  department_name: string;
  image_url: string;
  description: string;
  created_at: string;
};

export type departments = {
  id: number;
  department_name: string;
  description: string;
};

export type roles = {
  id: number;
  role: string;
};
export type uoms = {
  id: number;
  role: string;
};
export type stocks = {
  id: number;
  name: string;
  description: string;
};

export type category = {
  id: number;
  category: string;
};
export type allInventoryDisplay = {
  id: number;
  branches: {
    id: number;
    branch_name: string;
    branch_location: string;
  };
  products: {
    id: number;
    name: string;
    description: string;
    image_url: string;
    quantity: number;
    uom: string;
    price: number;
    barcode: string;
    status: string;
    created_at: string;
  }[];
};

export type allMainStocksDisplay = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  stock_quantity: number;
  uoms: {
    id: number;
    unit_name: string;
  };
  price: number;
  category: string;
  status: string;
  created_at: string;
};

export type request = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  stock_quantity: number;
  uoms: {
    id: number;
    unit_name: string;
  };
  price: number;
  category: string;
  status: string;
  created_at: string;
};

export type allPartsDisplay = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  stock_quantity: number;
  brands: {
    id: number;
    brand_name: string;
  };
  price: number;
  barcode: string;
  status: string;
  inventory: {
    id: number;
    branches: {
      id: number;
      branch_name: string;
      branch_location: string;
    };
  };
  created_at: string;
};

export type allServicesDisplay = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: number;
  duration: number;
  status: string;
  inventory: {
    id: number;
    branches: {
      id: number;
      branch_name: string;
      branch_location: string;
    };
  };
  created_at: string;
};

export type allPurchaseOrdersDisplay = {
  id: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_contact_number: string;
  customer_email: string;
  inventory: {
    id: number;
    branches: {
      id: number;
      branch_name: string;
      branch_location: string;
    };
  };
  employees: {
    id: number;
    first_name: string;
    last_name: string;
    image_url: string;
    contact_number: string;
    email: string;
    roles: { role: string };
  };
  purchase_products: {}[];
  purchase_parts: {}[];
  total_price: number;
  payment_method: string;
  status: string;
  created_at: string;
};
export type allPurchaseOrderServicesDisplay = {
  id: string | any;
  customer_first_name: string | any;
  customer_last_name: string | any;
  customer_contact_number: string | any;
  customer_email: string | any;
  subtotal: number | any;
  total_price: number | any;
  amount_paid: number | any;
  status: string | any;
  discount: number | any;
  payment_method: string | any;
  created_at: string | any;
  employee:
    | {
        id: string | any;
        email: string | any;
        roles: { role: string } | any;
        image_url: string | any;
        last_name: string | any;
        first_name: string | any;
        contact_number: number | any;
      }
    | any;
  supervisor:
    | {
        id: string | any;
        email: string | any;
        roles: { role: string } | any;
        image_url: string | any;
        last_name: string | any;
        first_name: string | any;
        contact_number: number | any;
        created_at: string | any;
      }
    | any;
  inventory:
    | {
        id: number | any;
        branches:
          | {
              id: number | any;
              created_at: string | any;
              branch_name: string | any;
              branch_manager: null | any;
              contact_number: string | any;
              branch_location: string | any;
            }
          | any;
      }
    | any;
  purchase_products:
    | {
        id: number | any;
        name: string | any;
        price: number | any;
        barcode: string | any;
        order_id: null | any;
        quantity: number | any;
        uom_name: string | any;
        image_url: string | any;
        created_at: string | any;
        product_id: number | any;
        description: string | any;
        inventory_id: number | any;
        order_service_id: string | any;
      }[]
    | any;
  purchase_parts:
    | {
        id: number | any;
        name: string | any;
        brand: string | any;
        price: number | any;
        barcode: string | any;
        part_id: number | any;
        order_id: null | any;
        quantity: number | any;
        image_url: string | any;
        created_at: string | any;
        description: string | any;
        inventory_id: number | any;
        order_service_id: string | any;
      }[]
    | any;
  purchase_services:
    | {
        id: number | any;
        name: string | any;
        price: number | any;
        image_url: string | any;
        created_at: string | any;
        service_id: number | any;
        description: string | any;
        inventory_id: number | any;
        order_service_id: string | any;
      }[]
    | any;
  mobile_user:
    | {
        id: string | any;
        dob: null | any;
        email: string | any;
        gender: string | any;
        points: number | any;
        address: string | any;
        password: string | any;
        image_url: string | any;
        last_name: string | any;
        created_at: string | any;
        first_name: string | any;
        contact_number: string | any;
      }
    | any;
  mechanic_entries:
    | {
        id: number | any;
        mechanic:
          | {
              id: string | any;
              email: string | any;
              roles: { role: string } | any;
              image_url: string | any;
              last_name: string | any;
              first_name: string | any;
              contact_number: number | any;
            }
          | any;
        created_at: string | any;
        employee_id: string | any;
        order_service_id: string | any;
      }[]
    | any;
  vehicle_entries:
    | {
        id: number | any;
        type: string | any;
        color: string | any;
        car_brand: string | any;
        car_model: string | any;
        created_at: string | any;
        odo_reading: number | any;
        plate_number: string | any;
        engine_number: string | any;
        chassis_number: string | any;
        order_service_id: string | any;
      }[]
    | any;
  progress_entries:
    | {
        id: number | any;
        created_at: string | any;
        progress_name: string | any;
        description: string | any;
        order_service_id: string | any;
      }[]
    | any;
};

export type branches = {
  id: number;
  branch_name: string;
  branch_location: string;
};

export type allProductsDisplay = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  stock_quantity: number;
  uoms: {
    id: number;
    unit_name: string;
  };
  price: number;
  barcode: string;
  status: string;
  inventory: {
    id: number;
    branches: {
      id: number;
      branch_name: string;
      branch_location: string;
    };
  };
  created_at: string;
};

export type allRewardsDisplay = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  points_required: number;
  stock_quantity: number;
  status: string;
  inventory: {
    id: number;
    branches: {
      id: number;
      branch_name: string;
      branch_location: string;
    };
  };
  created_at: string;
};

export type allPurchaseRequestsDisplay = {
  id: string;
  requester_first_name: string;
  requester_last_name: string;
  requester_contact_number: string;
  requester_email: string;
  employees: {
    id: number;
    first_name: string;
    last_name: string;
    image_url: string;
    contact_number: string;
    email: string;
    roles: { role: string };
  };
  calamity_types: {
    id: number;
    name: string;
    description: string;
  };
  use_foodsupplies: {}[];
  use_equipments: {}[];
  use_stocks: {}[];
  use_vehicles: {}[];
  total_price: number;
  payment_method: string;
  status: string;
  created_at: string;
};
