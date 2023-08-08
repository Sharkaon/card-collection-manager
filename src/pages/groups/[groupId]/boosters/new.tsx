import MainLayout from "@/components/mainLayout";
import type { NextPage } from "next";
import { api } from "@/utils/api";
import router from "next/router";
import { useState } from "react";

const NewBooster: NextPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [cardsPerPack, setCardsPerPack] = useState(0);

  const groupId = router.query.groupId as string;

  const createBoosterMutation = api.booster.create.useMutation();

  const handleChangeName = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const handleChangePrice = (e: React.FormEvent<HTMLInputElement>) => {
    setPrice(parseInt(e.currentTarget.value));
  };

  const handleChangeCardsPerPack = (e: React.FormEvent<HTMLInputElement>) => {
    setCardsPerPack(parseInt(e.currentTarget.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createBoosterMutation.mutate({
      groupId,
      name,
      price,
      cardsPerPack,
    });
  };

  return (
    <MainLayout>
      <form className="text-white flex flex-col justify-around h-60 align-middle flex-auto text-2xl" onSubmit={handleSubmit}>
        <h1 className="text-4xl">Create a new booster</h1>

        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            className="rounded text-black"
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleChangeName}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="price">Price</label>
          <input
            className="rounded text-black"
            type="number"
            name="price"
            id="price"
            value={price}
            onChange={handleChangePrice}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="cardsPerPack">Card per pack</label>
          <input
            className="rounded text-black"
            type="number"
            name="cardsPerPack"
            id="cardsPerPack"
            value={cardsPerPack}
            onChange={handleChangeCardsPerPack}
          />
        </div>

        <button
          className="bg-blue-400 rounded hover:bg-green-400"
          type="submit"
          disabled={ createBoosterMutation.isLoading }
        >Create</button>
      </form>
    </MainLayout>
  )
}

export default NewBooster;
