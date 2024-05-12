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
      RealEstate: {
        Path: "real-estate",
        Name: "Real Estate"
      },
      Client: {
        Path: "client",
        Name: "Client"
      }
    }
  },
  Actions: {
    edit: "edit",
    add: "add"
  }
}