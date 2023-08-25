export class MobileUserListModel {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  created: Date;
  subscriptionDate: Date;
  subscriptionType: string;
  totalPaidAmount: number;
  isSubscribed: boolean;
  isManuallySubscribed: boolean;
}
