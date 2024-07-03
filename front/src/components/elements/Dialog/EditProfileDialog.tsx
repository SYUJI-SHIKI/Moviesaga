import React, { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
  DialogPortal,
  DialogClose
} from "@/components/ui/dialog";

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

    onSave(formData)
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="px-4 py-2 bg-blue-600 rounded text-white">
          プロフィール編集
        </button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50" />
        <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-6 rounded-lg w-96">
          <DialogHeader>
            <DialogTitle className="text-2xl mb-4 text-white">プロフィール編集</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-white">アバター</label>
              <div className="flex items-center">
                <Image
                  src={previewUrl || '/avatar_sample.png'}
                  alt="Avatar Preview"
                  width={80}
                  height={80}
                  className="rounded-full mr-4"
                />
                <input type="file" onChange={handleFileChange} accept="image/*" className="text-white" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-white">名前</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 bg-gray-700 rounded text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-white">メールアドレス</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 bg-gray-700 rounded text-white"
              />
            </div>
            <div className="flex justify-end">
              <DialogClose asChild>
                <button type="button" className="mr-2 px-4 py-2 bg-gray-600 rounded text-white">
                  キャンセル
                </button>
              </DialogClose>
              <button type="submit" className="px-4 py-2 bg-blue-600 rounded text-white">
                保存
              </button>
            </div>
          </form>
          <DialogClose asChild>
            <button className="absolute top-2 right-2 text-white" aria-label="Close">
              X
            </button>
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default EditProfileDialog;
