export const baseUrl = `https://misbahjahann.bsite.net`;

export const allCategory = async () => {
  try {
    const responce = await fetch(`${baseUrl}/Categories`);
    if (responce.ok) {
      var data = await responce.json();
      return await data;
    }
    console.error(responce.json());
  } catch (error) {
    console.error(error);
  }
};

export const categoryById = async (id) => {
  try {
    const responce = await fetch(`${baseUrl}/Categories/Details/${id}`);
    if (responce.ok) {
      var data = await responce.json();
      return data;
    }
    console.error(responce.json());
  } catch (error) {
    console.error(error);
  }
};

export const productById = async (id) => {
  try {
    const responce = await fetch(`${baseUrl}/Products/Index/${id}`);
    if (responce.ok) {
      var data = await responce.json();
      console.log(data);
      return data;
    }
    console.error(responce.json());
  } catch (error) {
    console.error(error);
  }
};

export const getProductDeatilesById = async (id) => {
  try {
    const responce = await fetch(`${baseUrl}/Products/Details/${id}`);
    if (responce.ok) {
      var data = await responce.json();
      return data;
    }
    console.error(responce.json());
  } catch (error) {
    console.error(error);
  }
};

export const getAllOrders = async () => {
  try {
    const responce = await fetch(`${baseUrl}/Orders`);
    if (responce.ok) {
      var data = await responce.json();
      console.log(data);
      return data;
    }
    console.error(responce.json());
  } catch (error) {
    console.error(error);
  }
};

export const getOrdersDeatiles = async (id) => {
  try {
    const responce = await fetch(`${baseUrl}/Orders/Details/${id}`);
    if (responce.ok) {
      var data = await responce.json();

      return data;
    }
    console.error(responce.json());
  } catch (error) {
    console.error(error);
  }
};

export const createOrder = async (order) => {
  try {
    const responce = await fetch(`${baseUrl}/Order/Create`, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productList: '1,2,3,4',
        Address: 'DHA 2, Gate 2, Hira k ghar k paas.',
        PaymentType: 1,
      }),
    });
    if (responce.ok) {
      const data = await response.json();

      return data;
    }
    console.error(responce);
  } catch (error) {
    console.error(error);
  }
};

export const logIn = async (Email, Password) => {
  try {
    const requestOptions = {
      method: 'POST',
      redirect: 'follow',
    };

    const response = await fetch(
      `${baseUrl}/Account/Login?Email=${Email}&Password=${Password}`,
      requestOptions
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error during login:', error);
  }
};

export const register = async (
  fullName,
  Email,
  Password,
  phoneNumber,
  file
) => {
  try {
    const requestOptions = {
      method: 'POST',

      redirect: 'follow',
    };

    const responce = await fetch(
      `${baseUrl}/Account/Register?Fullname=${fullName}&Email=${Email}&Phone=${phoneNumber}&Password=${Password}&ConfirmPassword=${Password}&file=${file}`,
      requestOptions
    );
    const data = await responce.json();
    return data;
  } catch (error) {
    console.error('Error during login:', error);
  }
};
