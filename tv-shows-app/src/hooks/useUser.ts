
import { fetcherSecure } from "@/fetchers/fetcher";
import { swrKeys } from "@/fetchers/swrKeys";
import useSWR from "swr";

export const useUser = () => {
	return useSWR<{ uuid: string }>(swrKeys.profile, fetcherSecure);
}
