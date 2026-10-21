import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('HTML entry point mounts the application bundle', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8')

  assert.match(html, /<div id="root"><\/div>/)
  assert.match(html, /src="\/src\/main\.jsx"/)
})
