import axios from "axios";

import type { GetRandomMovieRequest } from "../types/GetRandomMovieRequest";
import { API_BASE_URL } from "../config";

const BASE_URL = `${API_BASE_URL}/api/v1/preferences`;

export async function getPreferences(): Promise<GetRandomMovieRequest> {
  const token = localStorage.getItem("token");

  const response = await axios.get(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function savePreferences(
  request: GetRandomMovieRequest,
): Promise<void> {
  const token = localStorage.getItem("token");

  await axios.put(
    BASE_URL,

    request,

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}
