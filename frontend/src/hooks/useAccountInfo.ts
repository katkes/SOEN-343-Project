import { useEffect, useState } from "react";
import { AccountStore } from "../stores/accountStore";
import { Account } from "../types/account";

export function useAccountInfo() {
  const [account, setAccount] = useState<Account>();
  // console.log("testing", account)
  useEffect(() => {
    AccountStore.getInstance().then((store) => {
      // console.log("testing2", store.account)
      setAccount(store.account)});
  }, [])
    
  return account;
}