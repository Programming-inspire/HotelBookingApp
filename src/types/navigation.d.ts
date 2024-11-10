// src/navigation.d.ts

export type RootStackParamList = {
    Splash: undefined;
    Dashboard: undefined;
    AuthScreen: undefined;
    ForgotPassword: undefined;
    Availability: undefined;
    Booking: {
      hotelId: number;
      userId: any;
      price: string;
    };
    HotelDetails: {
      id: number;
      name: string;
      location: string;
      rating: number;
      beds: number;
      bathrooms: number;
      guests: number;
      images: string[];
      price: string;
      highlights: string[],
      description: string
    };
  };
