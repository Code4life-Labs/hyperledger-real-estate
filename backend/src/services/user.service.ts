
const registerUser = async (data: any) => {
  try {
    console.log('Create register endpoint');
    return "Ok";
  } catch (error) {
    if (error instanceof Error) {
      console.log("🚀 ~ getAnswer ~ error:", error)
    }
  }
}

export const UserService = {
  registerUser
}
