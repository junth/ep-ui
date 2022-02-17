import React, { memo, useRef } from 'react'
import { Box } from '@chakra-ui/react'
// eslint-disable-next-line import/no-extraneous-dependencies
import '@toast-ui/editor/dist/toastui-editor.css'

import { Editor as ToastUIEditor } from '@toast-ui/react-editor'

type EditorType = {
  onChange: (value: string) => void
  initialValue: string
}

const Editor = ({ onChange, initialValue }: EditorType) => {
  const editorRef = useRef(null)

  return (
    <Box m={10}>
      <ToastUIEditor
        height="600px"
        initialValue={initialValue}
        ref={editorRef}
        onChange={() =>
          onChange((editorRef.current as any).getInstance().getMarkdown())
        }
      />
    </Box>
  )
}

export default memo(Editor)
