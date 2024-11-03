// src/navigation.d.ts

export type RootStackParamList = {
    Splash: undefined;
    Dashboard: undefined; // No parameters expected in Home
    HotelDetails: {
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
    // Add other screens here if necessary
  };
  