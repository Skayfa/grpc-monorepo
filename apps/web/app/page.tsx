"use client";
import { Button } from "@skayfa/ui/button";
import client from "../utils/client";

export default function Page(): JSX.Element {
  return (
    <main>
      <Button
        label="ddd"
        onClick={() => {
          client.eliza.say({ sentence: "I feel happy." }).then((res) => {
            console.log(res.sentence);
          });

          client.auth.login({ username: "jjj" }).then((res) => {
            console.log(res.token);
          });
        }}
      />
    </main>
  );
}
