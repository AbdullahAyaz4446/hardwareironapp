export const baseUrl = `https://misbahjahann.bsite.net`;

export const allCategory = async () => {
  try {
    const responce = await fetch(`${baseUrl}/Categories/Index`);

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
      return data;
    }
    console.error(responce.json());
  } catch (error) {
    console.error(error);
  }
};

export const getOrdersDeatiles = async (id) => {
  try {
    const responce = await fetch(`${baseUrl}/Orders/Index?UserId=${id}`);
    if (responce.ok) {
      var data = await responce.json();
      return data;
    }
    console.error(responce.json());
  } catch (error) {
    console.error(error);
  }
};

export const orderProductsDetailes = async (id) => {
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

export const topFiveProducts = async () => {
  try {
    const responce = await fetch(`${baseUrl}/Products/GetTopFiveProducts`);
    if (responce.ok) {
      var data = await responce.json();
      return data;
    }
    console.error(responce.json());
  } catch (error) {
    console.error(error);
  }
};

export const createOrder = async (
  address,
  userId,
  productList,
  paymentType
) => {
  try {
    const myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');

    myHeaders.append(
      'Cookie',
      '.AspNetCore.Antiforgery.cmcxWzcMSs0=CfDJ8L0sHgPhnqtPosZOb7Ojw2rhHVDpwONEYbLRKKEBBPE37IlnJG_SNEIUXD5Aub8B3-ePSvBgJpQu8ajGGBcfsGTbsOUFhm1O6r34RZeMTibYmHgBxNLgMWztgyuVrTkkWc_pfCajjpLXrZzgwkGrVu8'
    );

    const raw = JSON.stringify({
      Address: address,

      PaymentType: paymentType,

      UserId: userId,

      productList: productList,
    });

    const requestOptions = {
      method: 'POST',

      headers: myHeaders,

      body: raw,

      redirect: 'follow',
    };

    const productQuery = productList.map((p) => `productList=${p}`).join('&');

    const responce = await fetch(
      `${baseUrl}/Orders/Create?Address=${address}&PaymentType=${paymentType}&UserId=${userId}&${productQuery}`,
      requestOptions
    );
    if (responce.ok) {
      var data = await responce;
      return data;
    }
    console.error(responce);
  } catch (error) {
    console.error('Error creating order:', error);
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
