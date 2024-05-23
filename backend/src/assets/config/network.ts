import path from "path";

const permissions = {
  init: "init",
  createRealEstate: "create_real_estate",
  listRealEstates: "list_real_estates"
};

export const NetworkConfig = {
  Paths: {
    Wallet: path.resolve("./wallet")
  },

  CAAccountOrgs: [
    {
      Admin: {
        Id: "CAAdmin@org1.example.com",
        username: "admin01",
        password: "admin01",
        enrollmentId: "admin",
        enrollmentSecret: "adminpw"
      }
    },
    {
      Admin: {
        Id: "CAAdmin@org2.example.com",
        username: "admin02",
        password: "admin02",
        enrollmentId: "admin",
        enrollmentSecret: "adminpw"
      }
    }
  ],

  Roles: {
    UserDefault: {
      attrs: [
        { name: permissions.createRealEstate, value: "true" },
        { name: permissions.listRealEstates, value: "true" }
      ]
    }
  },

  SmartContractNames: {
    RealEstate: {
      CreateRealEstate: "createRealEstate",
      ListRealEstates: "listRealEstates",
      PatchRealEstate: "patchRealEstate",
      GetRealEstate: "getRealEstate",
      Init: "init"
    }
  }
}