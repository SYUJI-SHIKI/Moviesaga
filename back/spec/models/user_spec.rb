require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { build(:user) }

  describe 'バリデーション' do
    it '有効なファクトリを持つこと' do
      expect(user).to be_valid
    end

    it '名前がない場合は無効であること' do
      user.name = nil
      expect(user).to be_invalid
    end

    it 'メールアドレスがない場合は無効であること' do
      user.email = nil
      expect(user).to be_invalid
    end

    it '重複したメールアドレスは無効であること' do
      create(:user, email: 'test@example.com')
      user.email = 'test@example.com'
      expect(user).to be_invalid
    end

    it '重複した名前は無効であること' do
      create(:user, name: 'テスト太郎')
      user.name = 'テスト太郎'
      expect(user).to be_invalid
    end

    it 'パスワードが6文字未満の場合は無効であること' do
      user.password = user.password_confirmation = 'a' * 5
      expect(user).to be_invalid
    end
  end

  describe 'デフォルト値' do
    it 'providerのデフォルト値が"email"であること' do
      expect(user.provider).to eq 'email'
    end

    it 'allow_password_changeのデフォルト値がfalseであること' do
      expect(user.allow_password_change).to be false
    end

    it 'uuidが自動生成されること' do
      user.save
      expect(user.uuid).not_to be_nil
    end
  end

  describe 'メソッド' do
    it 'パスワードを変更できること' do
      user.save
      new_password = 'new_password'
      user.update(password: new_password, password_confirmation: new_password)
      expect(user.valid_password?(new_password)).to be true
    end
  end
end