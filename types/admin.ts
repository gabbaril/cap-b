export interface Broker {
  id: string
  email: string
  full_name: string
  company_name: string | null
  phone: string | null
  territory: string | null
  is_active: boolean
  created_at: string
}

export interface User {
  id: string
  email: string
  created_at: string
  last_sign_in_at: string | null
  role: string
}

export interface Lead {
  id: string
  lead_number: string
  full_name: string
  email: string
  phone: string
  address: string
  city: string | null
  property_type: string
  status: string
  assigned_to: string | null
  created_at: string
  is_finalized?: boolean
  sale_reason?: string
  potential_sale_desire?: string
  property_to_sell_type?: string
  sector?: string
  ideal_sale_deadline?: string
  approximate_market_value?: string
  need_buying_help?: string
  buying_sector?: string
  buying_budget?: string
  property_usage?: string
  owners_count?: number
  is_occupied?: string
  contact_person?: string
  construction_year?: number
  floors_count?: number
  basement_info?: string
  bedrooms_count?: number
  bathrooms_count?: number
  powder_rooms_count?: number
  approximate_area?: string
  recent_renovations?: string
  renovations_details?: string
  garage?: string
  property_highlights?: string
  contact_weekday?: string
  contact_weekend?: string
  contact_notes?: string
  brokers?: Broker
}
