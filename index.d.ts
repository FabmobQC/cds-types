import { Polygon } from "@turf/helpers"
import { UUID } from "crypto"

type Activity = "parking" | "no parking" | "loading" | "no loading" | "unloading" | "no unloading" | "stopping" | "no stopping" | "travel" | "no travel"
type UnitOfTime = "second" | "minute" | "hour" | "day" | "week" | "month" | "year"
type DayOfWeek = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat"

interface Zone {
  curb_zone_id: UUID
  geometry: Polygon
  curb_policy_ids: UUID[]
  prev_policies?: PreviousPolicy[]
  published_date: EpochTimeStamp 
  last_updated_date: EpochTimeStamp
  prev_curb_zone_ids?: UUID
  start_date: EpochTimeStamp
  end_date?: EpochTimeStamp
  location_references?: LocationReference[]
  name?: string
  user_zone_id?: string 
  street_name?: string
  cross_street_start_name?: string
  cross_street_end_name?: string
  length?: number
  available_space_lengths?: number[]
  availability_time?: EpochTimeStamp
  width?: number
  parking_angle?: string
  num_spaces?: number
  street_side?: string
  median?: boolean
  entire_roadway?: boolean
  curb_area_ids?: UUID[]
  curb_space_ids?: UUID[]
}

interface Area {
  curb_area_id: UUID
  geometry: Polygon
  name?: string
  published_date: EpochTimeStamp
  last_updated_date: EpochTimeStamp
  curb_zone_ids: UUID[]
}

interface Space {
  curb_space_id: UUID
  geometry: Polygon
  name?: string
  published_date: EpochTimeStamp
  last_updated_date: EpochTimeStamp
  curb_zone_id: UUID
  space_number?: number
  length: number
  width?: number
  available?: boolean
  availability_time?: EpochTimeStamp
}

interface Policy {
  curb_policy_id: UUID
  published_date: EpochTimeStamp
  priority: number
  rules: Rule[]
  time_spans?: TimeSpan[]
  data_source_operator_id?: UUID
}

interface Rule {
  activity: Activity
  max_stay?: number
  max_stay_unit?: UnitOfTime
  no_return?: number
  no_return_unit?: UnitOfTime
  user_classes: string[]
  rate: Rate[]
}

interface TypeSpan {
  start_date?: EpochTimeStamp
  end_date?: EpochTimeStamp
  days_of_week?: DayOfWeek[]
  days_of_month?: number[]
  months?: number[]
  time_of_day_start?: `${number}:${number}`
  time_of_day_end?: `${number}:${number}`
  designated_period?: string
  designated_period_except?: boolean
}

interface Rate {
  rate: number
  rate_unit: UnitOfTime
  rate_unit_period: "rolling" | "calendar"
  increment_duration?: number
  increment_amount?: number
  start_duration?: number
  end_duration?: number
}

interface LocationReference {
  source: string
  ref_id: string
  start: number
  end: number
  side?: string
}

interface PreviousPolicy {
  curb_policy_ids: UUID[]
  start_date: EpochTimeStamp
  end_date: EpochTimeStamp
}
