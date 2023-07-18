import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import React, {useState, useRef, useMemo} from "react";
import AWS from "aws-sdk";
import axios from "axios";

  const ReactQuill = dynamic(
      async () => {
    const { default: RQ } = await import('react-quill');
    // eslint-disable-next-line react/display-name
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
},
      {ssr: false}
  );

export default function TextEditor(){
    const [value, setValue] = useState('');
    const quillRef = useRef();


    const imageHandler = () => {
        console.log('에디터에서 이미지 버튼을 클릭하면 이 핸들러가 시작됩니다!');

        // 1. 이미지를 저장할 input type=file DOM을 만든다.
        const input = document.createElement('input');
        // 속성 써주기
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.
        // input이 클릭되면 파일 선택창이 나타난다.

        /*
        // input에 변화가 생긴다면 = 이미지를 선택
        input.addEventListener('change', async () => {
            console.log('온체인지');
            const file = input.files[0];
            console.log(file)
            // multer에 맞는 형식으로 데이터 만들어준다.
            const formData = new FormData();
            formData.append('img', file); // formData는 키-밸류 구조
            // 백엔드 multer라우터에 이미지를 보낸다.
            console.log(formData)
            try {
                const result = await axios.post('http://localhost:4050/img', formData);
                console.log('성공 시, 백엔드가 보내주는 데이터', result.data.url);
                const IMG_URL = result.data.url;
                // 이 URL을 img 태그의 src에 넣은 요소를 현재 에디터의 커서에 넣어주면 에디터 내에서 이미지가 나타난다
                // src가 base64가 아닌 짧은 URL이기 때문에 데이터베이스에 에디터의 전체 글 내용을 저장할 수있게된다
                // 이미지는 꼭 로컬 백엔드 uploads 폴더가 아닌 다른 곳에 저장해 URL로 사용하면된다.
                // 이미지 태그를 에디터에 써주기 - 여러 방법이 있다.
                const editor = quillRef.current.getEditor(); // 에디터 객체 가져오기
                // 1. 에디터 root의 innerHTML을 수정해주기
                // editor의 root는 에디터 컨텐츠들이 담겨있다. 거기에 img태그를 추가해준다.
                // 이미지를 업로드하면 -> 멀터에서 이미지 경로 URL을 받아와 -> 이미지 요소로 만들어 에디터 안에 넣어준다.
                // editor.root.innerHTML =
                //   editor.root.innerHTML + `<img src=${IMG_URL} /><br/>`; // 현재 있는 내용들 뒤에 써줘야한다.

                // 2. 현재 에디터 커서 위치값을 가져온다
                const range = editor.getSelection();
                // 가져온 위치에 이미지를 삽입한다
                editor.insertEmbed(range.index, 'image', IMG_URL);
            } catch (error) {
                console.log('실패했어요ㅠ');
                console.log(error)
            }
        });
        */

        input.addEventListener('change', async () => {
            console.log('온체인지');
            const file = input.files[0];
            console.log(file)

            try {
                //업로드할 파일의 이름으로 Date 사용
                const name = Date.now();
                //생성한 s3 관련 설정들
                AWS.config.update({
                    region: 'ap-northeast-2',
                    accessKeyId: 'AKIAVEQHUCWNJEAX2Z5P',
                    secretAccessKey: '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',
                });
                //앞서 생성한 file을 담아 s3에 업로드하는 객체를 만든다
                const upload = new AWS.S3.ManagedUpload({
                    params: {
                        ACL: "public-read",
                        Bucket: "jkh-bucket", //버킷 이름
                        Key: `upload/${name}`,
                        Body: file,
                    },
                });
                //이미지 업로드 후
                //곧바로 업로드 된 이미지 url을 가져오기
                const IMG_URL = await upload.promise().then((res) => res.Location);
                //useRef를 사용해 에디터에 접근한 후
                //에디터의 현재 커서 위치에 이미지 삽입
                const editor = quillRef.current.getEditor();
                const range = editor.getSelection();
                // 가져온 위치에 이미지를 삽입한다
                editor.insertEmbed(range.index, "image", IMG_URL);
            } catch (error) {
                console.log(error);
            }

        });
    };


    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ 'header': [1, 2,3,4,5,6, false] }],
                    [{ 'font' : []}],
                    [{ 'align': []}],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'list': 'ordered' },{ 'list': 'bullet' }],
                    [{ 'color': ['#360c0c']}],
                    ['image'],
                    ['clean']
                ],
                handlers: {
                    image: imageHandler,
                }
            }
        }
    }, []);


    return(
        <div>
            <ReactQuill
                forwardedRef={quillRef}
                value={value}
                onChange={setValue}
                modules={modules}
            />
            <div dangerouslySetInnerHTML={{ __html :  '<h1>test</h1>' }} />
        </div>
    )


}