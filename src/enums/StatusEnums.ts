export enum CourseStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export enum CategoryStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export enum BookingStatus {
  Incoming = 'incoming',
  Cancelled = 'cancelled',
  Completed = 'completed',
}

export enum BlackoutPeriodStatus {
  Active = 'active',
  Expired = 'expired',
}

export enum CustomerCourseStatus {
  Active = 'active',
  Completed = 'completed',
  Expired = 'expired',
}

export enum OrderStatusEnum {
  Created = 'created',
  Ongoing = 'ongoing',
  Completed = 'completed',
  Cancel = 'cancel',
}

export enum ChargeStatusEnum {
  FAILED = 'failed',
  EXPIRED = 'expired',
  PENDING = 'pending',
  REVERSED = 'reversed',
  SUCCESSFUL = 'successful',
}
