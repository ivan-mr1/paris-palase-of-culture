Требования к именам коммитов

- Названия коммитов должны быть согласно гайдлайну
- Тип коммита должен быть только в нижнем регистре (feat, fix, refactor, docs, style, chore и т.д.)
- Должен использоваться present tense ("add feature" not "added feature")
- Должен использоваться imperative mood ("move cursor to..." not "moves cursor to...")

- init: - используется для начала проекта/таска.
- feat: - это реализованная новая функциональность из технического задания (добавил поддержку зумирования, добавил footer, добавил карточку продукта).
- fix: - исправил ошибку в ранее реализованной функциональности.
- refactor: - новой функциональности не добавлял/поведения не менял. Файлы в другие места положил, удалил, добавил. Улучшил алгоритм, без изменения функциональности.
- docs: - используется при работе с документацией/readme проекта.
- style: - используется при изменениях стиля и оформления кода.
- chore: - используется, когда не меняются исходные файлы и файлы тестов.

работа со сборкой

- npm i
- npm run dev
- npm run build
- npm run preview

- npm run lint:js
- npm run lint:js:fix

- npm run lint:css
- npm run lint:css:fix

- npm run format
- npm run format:fix

- npm run lint
- npm run lint:fix

- git fetch --all --prune

for branch in $(git for-each-ref --format='%(refname:short)' refs/heads/); do
  echo "� Обновление ветки: $branch"
  git checkout "$branch" || continue

# Проверка, существует ли ветка на origin

if git show-ref --verify --quiet "refs/remotes/origin/$branch"; then
    git branch --set-upstream-to=origin/$branch "$branch"
    git pull
  else
    echo "⚠️  У ветки '$branch' нет соответствующей ветки на origin."
fi
done

