import { useEffect, useState } from "react";
import { AccountStore } from "../stores/accountStore";
import { Account } from "../types/account";

export function useAccountInfo() {
  const [account, setAccount] = useState<Account>();
    
  useEffect(() => {
    AccountStore.getInstance().then((store) => setAccount(store.account));
  }, [])
    
  return account;
}