// src/lib/utils.tsx

import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, Document } from '@contentful/rich-text-types';
import { Asset } from '@/app/types'; // Ajuste o caminho conforme necessário
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface AssetsMap {
  [key: string]: Asset;
}

export function renderRichText(body: Document, assets: Asset[]) {
  // Mapeamento de assets para acesso rápido
  const assetsMap: AssetsMap = assets.reduce((acc: AssetsMap, asset) => {
    acc[asset.sys.id] = asset;
    return acc;
  }, {});

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
        return <p>{children} </p>;
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const assetId = node.data.target.sys.id;
        const asset = assetsMap[assetId];

        if (asset) {
          const { url } = asset.fields.file;
          const description = asset.fields.description || asset.fields.title;
          const imageUrl = `https:${url}`;

          // Obter dimensões da imagem, se disponíveis
          const { width, height } = asset.fields.file.details.image || {};

          return (
            <div key={assetId} className="my-4" >
              <Image
                src={imageUrl}
                alt={description || 'Imagem'
                }
                width={width || 800
                } // Largura padrão se não fornecida
                height={height || 600
                } // Altura padrão se não fornecida
                layout="responsive"
              />
            </div>
          );
        } else {
          return (
            <p key={assetId} className="my-4 text-red-500" >
              Imagem não encontrada.
            </p>
          );
        }
      },
      [INLINES.HYPERLINK]: (node: any, children: any) => {
        const url = node.data.uri;
        return (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline inline-flex items-center gap-1"
          >
            {children}
            < ExternalLink className="h-3 w-3" />
          </a>
        );
      },
      // Você pode adicionar mais renderizadores para outros tipos de nós, se necessário
    },
    renderText: (text: string) => {
      // Dividir o texto nas quebras de linha e inserir <br />
      return text.split('\n').reduce((children: any, textSegment: string, index: number) => {
        return [...children, index > 0 && <br key={index} />, textSegment];
      }, []);
    },
  };

  return documentToReactComponents(body, options);
}
