// src/navigation.d.ts

export type RootStackParamList = {
    Dashboard: undefined; // No parameters expected in Home
    HotelDetails: {
      name: string;
      location: string;
      rating: number;
      beds: number;
      bathrooms: number;
      guests: number;
      images: string[];
      price: number;
      highlights: string[],
      description: string
    };
    // Add other screens here if necessary
  };
  