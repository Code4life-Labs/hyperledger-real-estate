export const RouteNames = {
  Home: {
    Path: "/home",
    Name: "Home"
  },
  Management: {
    Path: "/management",
    Name: "Management",
    Routes: {
      RealEstates: {
        Path: "real-estates",
        Name: "Real Estates"
      },
      Clients: {
        Path: "clients",
        Name: "Clients"
      },
      Users: {
        Path: "users",
        Name: "Users"
      },
      RealEstate: {
        Path: "real-estate",
        Name: "Real Estate"
      },
      Client: {
        Path: "client",
        Name: "Client"
      },
      User: {
        Path: "user",
        Name: "User"
      },
    }
  }
}

export const RouteActions = {
  edit: "edit",
  add: "add"
}