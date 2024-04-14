
const registerUser = async (data: any) => {
  try {
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
