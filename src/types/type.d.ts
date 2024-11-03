interface LoginResponse {
  message: string;
  role: string;
}

interface Route {
  name: string;
  path: string;
}

type AvailableRange = {
  from: Date;
  to: Date;
};

type UnavailableRange = {
  from: Date;
  to: Date;
};

interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

interface NavSection {
  title: string;
  icon: string;
  items: NavItem[];
}

type UserDTO = {
  userId: number;
  userFirstName: string;
  userLastName: string;
  emailAddress: string;
  phoneNumber: string;
  userDob: string | null;
  userAbout: string | null;
  districtName: string;
  provinceName: string;
};

type UserAccount = {
  userId: number;
  userFirstName: string;
  userLastName: string;
  avatarImageUrl: string | null;
  emailAddress: string;
  phoneNumber: string;
  genderId: number | null;
  userDob: string | null;
  userAbout: string | null;
  userPassword: string;
  districtName: string;
  provinceName: string;
  districtId: string;
};

type Amenity = {
  amenityId: number;
  amenityName: string;
  amenityDescription: string;
  amenityTypeName: string;
};

type Property = {
  propertyId: number;
  propertyName: string;
  hostId: number;
  typeOfPropertyId: number;
  districtId: number;
  propertyAddress: string;
  pricePerNight: number;
  serviceFee: number;
  propertyStructureId: number;
  livingRoomCount: number;
  bedroomCount: number;
  bedCount: number;
  bathroomCount: number;
  kitchenCount: number;
  minimumStay: number;
  maxGuest: number;
  propertyDescription: string;
};

type PropertyCardType = {
  propertyId: number;
  propertyName: string;
  hostName: string;
  provinceName: string;
  districtName: string;
  averagePropertyRating: number;
  numberPropertyRating: number;
  address: string;
  pricePerNight: number;
  mainPhotoUrl: string;
  isSponsored?: boolean;
  bedCount: number;
  bathroomCount: number;
  maxGuest: number;
};

interface CancellationPolicy {
  cancellationPolicyId: number;
  cancellationPolicyTypeName: string;
  cancellationPolicyTypeId: number;
  refundPercentage: number;
  milestoneDate: number;
  propertyId: number;
}
