export const navItems: NavItem[] = [
  // Dashboard Overview
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "chart",
    label: "Dashboard",
  },

  // Users Management
  {
    title: "All Accounts",
    href: "/dashboard/user-accounts",
    icon: "userCheck",
    label: "All Accounts",
  },
  {
    title: "Add New Account",
    href: "/dashboard/user-accounts/new",
    icon: "userCheck",
    label: "Add New Account",
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: "bookUser",
    label: "Customers",
  },
  {
    title: "Hosts",
    href: "/dashboard/hosts",
    icon: "home", // Biểu tượng ngôi nhà
    label: "Hosts",
  },

  // Properties
  {
    title: "All Properties",
    href: "/dashboard/properties",
    icon: "building", // Biểu tượng tòa nhà
    label: "Properties",
  },
  {
    title: "Add New Property",
    href: "/dashboard/properties/new",
    icon: "building",
    label: "Add New Properties",
  },
  {
    title: "All Amenities",
    href: "/dashboard/amenities",
    icon: "image",
    label: "All Amenities",
  },
  {
    title: "Add New Amenity",
    href: "/dashboard/amenities/new",
    icon: "image",
    label: "Add Amenitiy",
  },
  {
    title: "House Rules",
    href: "/dashboard/house-rules",
    icon: "clipboardList", // Biểu tượng danh sách
    label: "House Rules",
  },

  // Booking Management
  {
    title: "All Bookings",
    href: "/dashboard/bookings",
    icon: "calendar", // Biểu tượng lịch
    label: "Bookings",
  },
  {
    title: "Canceled Bookings",
    href: "/dashboard/bookings/canceled",
    icon: "calendar", // Biểu tượng lịch
    label: "Canceled Bookings",
  },

  // Financial Management

  {
    title: "Payments",
    href: "/dashboard/payments",
    icon: "dollarSign", // Biểu tượng đô la
    label: "Payments",
  },

  // Promo Code Management
  {
    title: "Promo Codes",
    href: "/dashboard/promo-codes",
    icon: "tag", // Biểu tượng nhãn
    label: "Promo Codes",
  },

  // Messages Management
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: "messageCircle", // Biểu tượng tin nhắn
    label: "Messages",
  },

  // Analytics & Reports
  {
    title: "Analytics",
    href: "/dashboard/Analytics",
    icon: "chart",
    label: "Analytics",
  },

  // Helps
  {
    title: "Helps",
    href: "/dashboard/Helps",
    icon: "help",
    label: "Helps",
  },
];

export const navSections: NavSection[] = [
  {
    title: "Dashboard",
    icon: "chart",
    items: navItems.filter((navItem) => ["Dashboard"].includes(navItem.title)),
  },
  {
    title: "Accounts",
    icon: "user",
    items: navItems.filter((navItem) =>
      ["All Accounts", "Add New Account", "Customers", "Hosts"].includes(
        navItem.title
      )
    ),
  },
  {
    title: "Properties",
    icon: "building",
    items: navItems.filter((navItem) =>
      ["All Properties", "Add New Property", "House Rules"].includes(
        navItem.title
      )
    ),
  },
  {
    title: "Amenities",
    icon: "siApplearcade",
    items: navItems.filter((navItem) =>
      ["All Amenities", "Add New Amenity"].includes(navItem.title)
    ),
  },
  {
    title: "Booking",
    icon: "calendar",
    items: navItems.filter((navItem) =>
      ["All Bookings", "Canceled Bookings"].includes(navItem.title)
    ),
  },
  {
    title: "Payments",
    icon: "dollarSign",
    items: navItems.filter((navItem) => ["Payments"].includes(navItem.title)),
  },
  {
    title: "Promo Code",
    icon: "tag",
    items: navItems.filter((navItem) =>
      ["Promo Codes"].includes(navItem.title)
    ),
  },
  {
    title: "Messages",
    icon: "messageCircle",
    items: navItems.filter((navItem) => ["Messages"].includes(navItem.title)),
  },
  {
    title: "Analytics & Reports",
    icon: "chart",
    items: navItems.filter((navItem) => ["Analytics"].includes(navItem.title)),
  },
  {
    title: "Helps",
    icon: "help",
    items: navItems.filter((navItem) => ["Helps"].includes(navItem.title)),
  },
];
