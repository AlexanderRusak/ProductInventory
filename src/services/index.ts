import { API } from "@constants/api";

export interface Product {
  name: string;
}

export interface Inventory extends Product {
  quantity: number;
  name: string;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export class InventoryService {
  private static apiUrl: string = import.meta.env.VITE_API_URL;

  private static async fetchData<T>(url: string, method: HttpMethod = "GET", body?: string): Promise<T> {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    if (response.ok) {
      return data as T;
    } else {
      throw new Error(data.error || "An error occurred while fetching data");
    }
  }

  public static getProductsList = () => {
    const url = `${this.apiUrl}${API.PRODUCTS_LIST}`;
    return this.fetchData<Product[]>(url);
  };

  public static getInventoryList = () => {
    const url = `${this.apiUrl}${API.INVENTORY}`;
    return this.fetchData<Inventory[]>(url);
  };

  public static resetInventory = () => {
    const url = `${this.apiUrl}${API.RESET_INVENTORY}`;
    return this.fetchData<[]>(url, "POST");
  };

  public static createProduct = (product: Product) => {
    const url = `${this.apiUrl}${API.CREATE_PRODUCT}`;
    return this.fetchData<Product[]>(url, "PUT", product);
  };

  public static submitInventory = (inventory: Inventory[]) => {
    const url = `${this.apiUrl}${API.INVENTORY}`;
    return this.fetchData<Inventory[]>(url, "POST", inventory);
  };
}
