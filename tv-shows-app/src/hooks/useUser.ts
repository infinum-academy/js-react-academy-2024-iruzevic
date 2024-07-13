
import { fetcherSecure } from "@/fetchers/fetcher";
import { processRequest } from "@/fetchers/processor";
import { swrKeys } from "@/fetchers/swrKeys";
import useSWR from "swr";

export const useUser = () => {
	return useSWR<{uuid: string}>(swrKeys.profile, fetcherSecure);
}
