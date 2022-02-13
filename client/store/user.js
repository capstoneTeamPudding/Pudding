export const newUser = () =>
  async () => {
    try {
      const { data } = await axios({
        method: "post",
        url: 'api/users',
        data: {
          email: "krystin@gmail.com",
          firstName: "Krystin",
          lastName: "Fieldss"
        }
      })
    } catch (err) {
      console.log(err);
      return err.message;
    }
  };