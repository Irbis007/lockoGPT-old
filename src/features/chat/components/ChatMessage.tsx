import { memo, useId, useState } from "react";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { InlineMath, BlockMath } from "react-katex"; 

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

import {styled, keyframes} from "styled-components";

import { MessageRole, IMessage } from "../models/api";
import useAuth from "@/features/authorization/hooks/useAuth";

import Logotype from "@/components/Logotype";
import ProfileBadge from "@/components/ProfileBadge";
import CopyButton from "./CopyButton";
import FileLink from "./FileLink";

import Twemoji from "react-twemoji";
import "katex/dist/katex.min.css"; 
 


const StyledChatMessage = styled.div<{ $role: MessageRole }>`
  padding: 20px 80px;

  display: flex;
  flex-direction: column;
  row-gap: 10px;

  background-color: ${({ $role }) => ($role === "user" ? "unset" : "unset")};
`;

const Wrapper = styled.div`
  padding-left: calc(32px + 10px);
`;

const Content = styled.div`
  font-weight: 400;

  > p {
    margin: 0;
  }

  a {
    color: #0039a6;
  }

  p + div > table {
    margin-top: 10px;
  }

  p + p {
    margin-top: 10px;
  }

  div + div {
    margin-top: 10px;
  }

  ol > li > ul {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  ol > li > ol {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  img.twemoji {
    display: inline-block;
    height: 20px;
    margin-left: 3px;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: 10px;
  margin-top: 10px;
`;

const CodeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const CodeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  background: rgb(243, 243, 243);
  margin-bottom: -7px;
  border-radius: 0.3em 0.3em 0 0;
`;
const Span = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CopyCodeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;


const scale = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
`;

const LoadingBlock = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(220, 220, 220);
  animation: ${scale} 2s linear infinite;
`;



const ChatMessage = memo(({ role, content, files }: IMessage) => {
  const { name } = useAuth();
  const contentElementId = useId();
  const [isTextCopied, setIsTextCopied] = useState<boolean>(false);

  const copyContent = () => {
    const contentElement = document.getElementById(contentElementId);
    return contentElement === null ? "" : contentElement.textContent!;
  };
  // console.log(content, files);

  const onCopyText = () => {
    const regex = /```(?:\w+\n)?([\s\S]+?)```/;

    const text = content.match(regex)

    if (text !== null) {
      navigator.clipboard.writeText(text[1])
    }

    setIsTextCopied(true);

    setTimeout(() => {
      setIsTextCopied(false);
    }, 1500);
  };

  const splitTextAndFormulas = (text: any) => { 
    if(text && typeof text == 'string'){ 
      const regex = /\${:(.*?):}\$|&{:(.*?):}&/gs; 
    let parts = []; 
    let lastIndex = 0; 
    text.replace(regex, (match, formula1, formula2, offset): any  => { 
       
      if (lastIndex !== offset) { 
        parts.push({ type: 'text', content: text.slice(lastIndex, offset) }); 
      } 
      if(formula1 != undefined){ 
        parts.push({ type: 'formulaInline', content: match.replace(regex, formula1) }); 
      } 
      if(formula2 != undefined){ 
        parts.push({ type: 'formulaBlock', content: match.replace(regex, formula2) }); 
      } 
       
      lastIndex = offset + match.length; 
    }); 
    if (lastIndex < text.length) { 
      parts.push({ type: 'text', content: text.slice(lastIndex) }); 
    } 
     
    return parts; 
    }
return [{type: 'text', content: text}] 
 
  }; 
 
  const changeWrapper = (text: string) => { 
    text = text.replace(/\\\((.*?)\\\)/g, '${: $1 :}$'); 
    text = text.replace(/\\\[(?:\w+\n)?([\s\S]+?)\\\]/g, '&{: $1 :}&'); 
    return text; 
  } 
 
  const changedText = changeWrapper(content) 

  return (
    <StyledChatMessage $role={role}>
      {role === "user" ? (
        <ProfileBadge fullName={name} />
      ) : (
        <Logotype orientation="horizontal" size="extra-small" />
      )}
      
      <Wrapper>
      {content == 'loading' ? <LoadingBlock/> :
        <Content id={contentElementId}>
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => {
                let resArr = splitTextAndFormulas(children); 
                return (
                  <p>
                    <Twemoji options={{ className: "twemoji" }}>
                    <div> 
                        {resArr.map((item, i) => { 
                          if (item.type == "formulaBlock") { 
                            return <BlockMath key={i}>{item.content}</BlockMath>; 
                          } else if(item.type == 'formulaInline'){ 
                            return <InlineMath key={i}>{item.content}</InlineMath> 
                          } else { 
                            return <span key={i}>{item.content}</span>; 
                          } 
                        })} 
                      </div> 
                    </Twemoji>
                  </p>
                );
              },
              table: ({ children }) => {
                return (
                  <div style={{ borderRadius: "var(--table-border-radius)", overflowX: "auto" }}>
                    <table>{children}</table>
                  </div>
                );
              },
              code: ({ children, className, ref: _ref, node: _node, ...rest }) => {
                const match = /language-(\w+)/.exec(className || "");
                console.log(content)
                return match ? (
                  <CodeWrapper>
                    <CodeInfo>
                      <Span>{match ? match[1] : null}</Span>
                      {isTextCopied ? (
                        <CopyCodeWrapper>
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon-sm"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M18.0633 5.67375C18.5196 5.98487 18.6374 6.607 18.3262 7.06331L10.8262 18.0633C10.6585 18.3093 10.3898 18.4678 10.0934 18.4956C9.79688 18.5234 9.50345 18.4176 9.29289 18.2071L4.79289 13.7071C4.40237 13.3166 4.40237 12.6834 4.79289 12.2929C5.18342 11.9023 5.81658 11.9023 6.20711 12.2929L9.85368 15.9394L16.6738 5.93664C16.9849 5.48033 17.607 5.36263 18.0633 5.67375Z"
                              fill="#757575"
                            ></path>
                          </svg>
                          Copied!
                        </CopyCodeWrapper>
                      ) : (
                        <CopyCodeWrapper onClick={() => onCopyText()}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="icon-sm"
                          >
                            <path
                              fill="#757575"
                              fillRule="evenodd"
                              d="M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          Copy code
                        </CopyCodeWrapper>
                      )}
                    </CodeInfo>
                    <SyntaxHighlighter
                      {...rest}
                      PreTag="div"
                      children={String(children).replace(/\n$/, "")}
                      language={match[1]}
                      style={oneLight}
                      customStyle={{ borderRadius: "0 0 0.3em 0.3em" }}
                    />
                  </CodeWrapper>
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
              li: ({ children }) => { 
                let resArr = splitTextAndFormulas(children); 
                return ( 
                  <li> 
                    {resArr.map((item, i) => { 
                        if (item.type == "formulaBlock") { 
                          return <BlockMath key={i}>{item.content}</BlockMath>; 
                        } else if(item.type == 'formulaInline'){ 
                          return <InlineMath key={i}>{item.content}</InlineMath> 
                        } else { 
                          return <span className="d" key={i}>{item.content}</span>; 
                        } 
                    })} 
                  </li> 
                ); 
              }, 
            }}
          >
            {changedText}
          </Markdown>
        </Content>}
        <Footer>
          {!!files?.length &&
            role === "user" &&
            files.map((file, fileIndex) => (
              <FileLink key={fileIndex} name={file.filename} url={file.url_local} />
            ))}
          {role === "assistant" && content != 'loading' && <CopyButton onCopy={copyContent} />}
        </Footer>
      </Wrapper>
    </StyledChatMessage>
  );
});

export default ChatMessage;
