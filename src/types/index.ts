export interface MenuItem {
    id: string;
    name: string;
    quantity: number;
    price_per_item: number;
    image_url: string;
}

export interface Bill {
  gross_amount: number;
  tax: number;
  net_amount: number;
  discount: number;
  platform_fee: number;
}


export interface Restaurant {
  name: string;
  profile_image_url: string;
  address_street_1: string;
  address_city: string;
  address_state: string;
  address_postal_code: string;
}

export interface Cart {
    menu_items: MenuItem[];
    bill: Bill;
    restaurant: Restaurant;
    restaurant_id: string;
}

export interface WorkingHour {
    day: string;
    opens: string;
    closes: string;
}