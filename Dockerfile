# syntax = docker/dockerfile:1

# Rubyのバージョン指定
ARG RUBY_VERSION=3.2.2
FROM ruby:$RUBY_VERSION-slim as base

# アプリケーションの作業ディレクトリを設定
WORKDIR /rails

# 環境設定
ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development:test"

# RubyとBundlerの更新
RUN gem update --system --no-document && \
    gem install -N bundler

# 最終イメージのサイズを削減するための一時的なビルドステージ
FROM base as build

# ビルドに必要なパッケージをインストール
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential libpq-dev

# GemfileとGemfile.lockをコピーして依存関係をインストール
COPY --link Gemfile Gemfile.lock ./
RUN bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile --gemfile

# アプリケーションのコードをコピー
COPY --link . .

# bootsnapでアプリケーションのブート時間を短縮
RUN bundle exec bootsnap precompile app/ lib/

# 最終的なアプリケーションイメージ
FROM base

# デプロイに必要なパッケージをインストール
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl libvips postgresql-client && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# ビルド段階で作成されたアーティファクトをコピー
COPY --from=build "${BUNDLE_PATH}" "${BUNDLE_PATH}"
COPY --from=build /rails /rails

# 環境変数を使用してユーザー作成と権限変更
RUN groupadd --system --gid 1000 rails && \
    useradd --uid 1000 --gid rails --create-home --shell /bin/bash rails && \
    chown -R rails:rails /rails/db /rails/log /rails/storage /rails/tmp
USER rails

# コンテナ起動時にdocker-entrypointを実行
ENTRYPOINT ["/rails/bin/docker-entrypoint"]

# コンテナ起動時にdocker-entrypointを実行
EXPOSE 3000

#　コンテナ起動時のデフォルトコマンドを設定
CMD ["./bin/rails", "server"]
