import { Seo } from '../../src/components/seo';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from '../../src/components/link';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useTheme } from '@mui/system';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const code = `
# 비밀번호 저장

모든 비밀번호는 해시와 솔트를 이용해 저장합니다.

## 쓰이는 코드

~~~
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Security.Cryptography;

public static class PasswordHelper
{
    private static byte[] GenerateSalt()
    {
        byte[] salt = new byte[16];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(salt);
        return salt;
    }

    public static HashedPassword Hash(string password, byte[] salt = null)
    {
        salt ??= GenerateSalt();
        var hashed = KeyDerivation.Pbkdf2(password, salt, KeyDerivationPrf.HMACSHA256, iterationCount: 250000, numBytesRequested: 32);

        var base64Salt = Convert.ToBase64String(salt);
        var base64Hashed = Convert.ToBase64String(hashed);

        return new HashedPassword(base64Hashed, base64Salt);
    }

    public static bool Match(string password, HashedPassword hashedPassword)
    {
        var salt = Convert.FromBase64String(hashedPassword.Salt);
        var hashed = Hash(password, salt);
        return hashed.Password.Equals(hashedPassword.Password);
    }
}
~~~
`;

const saved = `
## 동일한 비밀번호로 저장된 값 예시
~~~
[
    {
        "Password": "O3XexbJdXhHReURAe2F/nRT3HuN4/JpysuPi7ktQ8zI=",
        "Salt": "UYr+kmAu53l5h3OGqqKQrA==",
        ...
    },
    {
        "Password": "0O9g7ESSNsVWOtN5aYOPPw1UguBomp5NUQDgVD2nm/A=",
        "Salt": "5UjZm5Jr55kfn6kc0e2AtA==",
        ...
    },
    ...
]
~~~
`;

const link =
    'https://docs.microsoft.com/ko-kr/aspnet/core/security/data-protection/consumer-apis/password-hashing?view=aspnetcore-5.0';

const title = '비밀번호 저장 방식';
const description = '비밀번호 저장 방식';


const PasswordHelp = () => {
    const theme = useTheme();
    return (
        <>
            <Seo title={title} description={description} noIndex />
            <Card variant={'outlined'}>
                <CardContent>
                    <ReactMarkdown
                        components={{
                            code: ({ node, ...props }) => (
                                <SyntaxHighlighter
                                    showLineNumbers
                                    style={vscDarkPlus}
                                    language={'csharp'}
                                    PreTag='div'
                                    customStyle={{ borderRadius: theme.shape.borderRadius }}
                                    {...props}
                                />
                            ),
                        }}
                    >
                        {code}
                    </ReactMarkdown>
                    <ReactMarkdown
                        components={{
                            code: ({ node, ...props }) => (
                                <SyntaxHighlighter
                                    showLineNumbers
                                    style={vscDarkPlus}
                                    language={'json'}
                                    PreTag='div'
                                    customStyle={{ borderRadius: theme.shape.borderRadius }}
                                    {...props}
                                />
                            ),
                        }}
                    >
                        {saved}
                    </ReactMarkdown>
                    <Typography variant='h6' component={'div'} gutterBottom>
                        참고 자료
                    </Typography>
                    <Link href={link} target={'_blank'} rel={'noopener noreferrer'}>{link}</Link>
                </CardContent>
            </Card>
        </>
    );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
};

export default PasswordHelp;
