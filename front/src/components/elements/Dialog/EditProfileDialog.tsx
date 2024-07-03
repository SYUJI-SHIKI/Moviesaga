import React, { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
  DialogPortal,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"
import { FaTimes } from "react-icons/fa";

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

interface EditProfileDialogProps {
  user: User;
  onSave: (formData: FormData) => void;
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({ user, onSave }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(user.avatar);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    console.log(formData)

    onSave(formData)
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-2 rounded text-white outline">
          プロフィール編集
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 " />
        <DialogContent className="max-w-md rounded-md">
          <DialogHeader>
            <DialogTitle className="text-white">プロフィール編集</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="">
              <div className="flex items-end">
                <Image
                // これ後で入れるよ
                  src={previewUrl || '/avatar_sample.png'}
                  alt="Avatar Preview"
                  width={100}
                  height={80}
                  className="rounded-full mr-4"
                />
                <input 
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*" 
                  className="text-white"
                />
              </div>
            </div>
            <div className="m-4">
              <label className="block mb-2 text-white">名前</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 bg-gray-700 rounded text-white"
              />
            </div>
            <div className="m-4">
              <label className="block mb-2 text-white">メールアドレス</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 bg-gray-700 rounded text-white"
              />
            </div>
            <div className="flex justify-end mt-5">
              <DialogClose asChild>
                <button type="button" className="mr-2 px-4 py-2 outline-2 outline rounded text-white">
                  キャンセル
                </button>
              </DialogClose>
              <button type="submit" className="px-4 py-2 outline rounded text-white">
                保存
              </button>
            </div>
          </form>
          <DialogClose asChild>
            <button className="absolute top-2 right-2 text-white" aria-label="Close">
              <FaTimes />
            </button>
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default EditProfileDialog;
