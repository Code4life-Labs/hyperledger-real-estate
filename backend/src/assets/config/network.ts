export const NetworkConfig = {
  CAAccountOrgs: [
    {
      Admin: {
        Id: "CAAdmin@org1.example.com",
        enrollmentId: "admin",
        enrollmentSecret: "adminpw"
      }
    },
    {
      Admin: {
        Id: "CAAdmin@org2.example.com",
        enrollmentId: "admin",
        enrollmentSecret: "adminpw"
      }
    }
  ],

  Roles: {
    UserDefault: {
      attrs: [
        {"name": "init", "value": "true"}
      ]
    }
  },

  SmartContractNames: {
    RealEstate: {
      CreateRealEstate: "createRealEstate",
      ListRealEstates: "listRealEstates",
      PatchRealEstate: "patchRealEstate",
      GetRealEstate: "getRealEstate"
    }
  }
}