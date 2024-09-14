export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "chart",
    label: "Dashboard",
  },
  {
    title: "Amenities list",
    href: "/dashboard/amenities",
    icon: "combine", // Biểu tượng kiểm tra tiện ích đã có
    label: "Amenities",
  },
  {
    title: "Bank Accounts",
    href: "/dashboard/bank-accounts",
    icon: "creditCard", // Biểu tượng thẻ tín dụng
    label: "Bank Accounts",
  },
  {
    title: "Bookings",
    href: "/dashboard/bookings",
    icon: "calendar", // Biểu tượng lịch
    label: "Bookings",
  },
  {
    title: "Cancellation Policies",
    href: "/dashboard/cancellation-policies",
    icon: "xCircle", // Biểu tượng dấu "X"
    label: "Cancellation Policies",
  },
  {
    title: "Cancellation Policy Types",
    href: "/dashboard/cancellation-policy-types",
    icon: "fileText", // Biểu tượng văn bản
    label: "Cancellation Policy Types",
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: "bookUser", // Biểu tượng người dùng
    label: "Customers",
  },
  {
    title: "Customer Reviews",
    href: "/dashboard/customer-reviews",
    icon: "star", // Biểu tượng sao
    label: "Customer Reviews",
  },
  {
    title: "Hosts",
    href: "/dashboard/hosts",
    icon: "home", // Biểu tượng ngôi nhà
    label: "Hosts",
  },
  {
    title: "House Rules",
    href: "/dashboard/house-rules",
    icon: "clipboardList", // Biểu tượng danh sách
    label: "House Rules",
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: "messageCircle", // Biểu tượng tin nhắn
    label: "Messages",
  },
  {
    title: "Payments",
    href: "/dashboard/payments",
    icon: "dollarSign", // Biểu tượng đô la
    label: "Payments",
  },
  {
    title: "Promo Codes",
    href: "/dashboard/promo-codes",
    icon: "tag", // Biểu tượng nhãn
    label: "Promo Codes",
  },
  {
    title: "Properties",
    href: "/dashboard/properties",
    icon: "building", // Biểu tượng tòa nhà
    label: "Properties",
  },
  {
    title: "Property Photos",
    href: "/dashboard/property-photos",
    icon: "image", // Biểu tượng hình ảnh
    label: "Property Photos",
  },
  {
    title: "Property Reviews",
    href: "/dashboard/property-reviews",
    icon: "starP", // Biểu tượng nửa sao
    label: "Property Reviews",
  },
  {
    title: "Property Rules",
    href: "/dashboard/property-rules",
    icon: "clipboardList", // Biểu tượng danh sách
    label: "Property Rules",
  },
  {
    title: "Property Structures",
    href: "/dashboard/property-structures",
    icon: "layers", // Biểu tượng lớp
    label: "Property Structures",
  },
  {
    title: "Provinces",
    href: "/dashboard/provinces",
    icon: "map", // Biểu tượng bản đồ
    label: "Provinces",
  },
  {
    title: "Rule Types",
    href: "/dashboard/rule-types",
    icon: "sliders", // Biểu tượng thanh trượt
    label: "Rule Types",
  },
  {
    title: "Types of Property",
    href: "/dashboard/types-of-property",
    icon: "grid", // Biểu tượng lưới
    label: "Types of Property",
  },
  {
    title: "User Accounts",
    href: "/dashboard/user-accounts",
    icon: "userCheck", // Biểu tượng người dùng đã xác thực
    label: "User Accounts",
  },
];

export const navSections: NavSection[] = [
  {
    title: "Dashboard",
    icon: "chart", // Biểu tượng kiểm tra tiện ích đã có
    items: navItems.filter((navItem) => ["Dashboard"].includes(navItem.title)),
  },
  {
    title: "Users",
    icon: "user", // Biểu tượng người dùng
    items: navItems.filter((navItem) =>
      ["Customers", "Hosts", "User Accounts", "User Tokens"].includes(
        navItem.title
      )
    ),
  },
  {
    title: "Properties",
    icon: "building", // Biểu tượng tòa nhà
    items: navItems.filter((navItem) =>
      [
        "Properties",
        "Types of Property",
        "Property Structures",
        "Property Photos",
        "Property Availability",
        "Property Reviews",
        "Property Rules",
      ].includes(navItem.title)
    ),
  },
  {
    title: "Amenities",
    icon: "combine", // Biểu tượng kiểm tra tiện ích đã có
    items: navItems.filter((navItem) =>
      ["Amenities list"].includes(navItem.title)
    ),
  },

  {
    title: "Financial",
    icon: "creditCard", // Biểu tượng thẻ tín dụng
    items: navItems.filter((navItem) =>
      ["Bank Accounts", "Payments", "Promo Codes"].includes(navItem.title)
    ),
  },
  {
    title: "Location",
    icon: "map", // Biểu tượng bản đồ
    items: navItems.filter((navItem) =>
      ["Provinces", "Districts"].includes(navItem.title)
    ),
  },
  {
    title: "Reviews",
    icon: "starSection", // Biểu tượng nửa sao
    items: navItems.filter((navItem) =>
      ["Customer Reviews", "Property Reviews"].includes(navItem.title)
    ),
  },
  {
    title: "Policies",
    icon: "scale", // Biểu tượng dấu "X"
    items: navItems.filter((navItem) =>
      [
        "Cancellation Policies",
        "Cancellation Policy Types",
        "Rule Types",
        "House Rules",
      ].includes(navItem.title)
    ),
  },
  {
    title: "Messages",
    icon: "messageCircle", // Biểu tượng tin nhắn
    items: navItems.filter((navItem) => navItem.title === "Messages"),
  },
  {
    title: "OAuth",
    icon: "key", // Biểu tượng khóa
    items: navItems.filter((navItem) =>
      ["OAuth Tokens", "User Tokens"].includes(navItem.title)
    ),
  },
];
