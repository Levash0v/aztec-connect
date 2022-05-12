import React from 'react';
import styled from 'styled-components';
import {
  BlockSummary,
  InfoRow,
  HashValue,
  Timestamp,
  HashValuePlaceholder,
  InfoValuePlaceholder,
  Value,
} from '../block_summary';
import { getNetwork, Network } from '../config';
import { DetailsSection } from '../template';
import etherscanIcon from '../images/etherscan.svg';
import { ProofData, ProofDataPlaceholder } from '../proof_data';
import { Block } from './query';

export const getEtherscanLink = (network: Network, ethTxHash: string) => {
  const { etherscanUrl } = network;
  return `${etherscanUrl}/tx/0x${ethTxHash}`;
};

const TimestampRoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const EtherScanLink = styled.a`
  display: inline-block;
  line-height: 0;

  &:hover {
    filter: saturate(1.5);
  }
`;

const EtherScanIcon = styled.img`
  height: 28px;
`;

export const BlockDetailsPlaceholder: React.FunctionComponent = () => {
  const summaryPlaceholder = (
    <BlockSummary title="Block Header">
      <InfoRow title="TIMESTAMP">
        <InfoValuePlaceholder style={{ width: '50%' }} />
      </InfoRow>
      <InfoRow title="BLOCK HASH">
        <HashValuePlaceholder />
      </InfoRow>
      <InfoRow title="DATA ROOT">
        <HashValuePlaceholder />
      </InfoRow>
      <InfoRow title="NULLIFIER ROOT">
        <HashValuePlaceholder />
      </InfoRow>
    </BlockSummary>
  );

  return <DetailsSection lhsContent={summaryPlaceholder} rhsContent={<ProofDataPlaceholder />} />;
};

interface BlockDetailsProps {
  block: Block;
  network: Network;
}

export const BlockDetails: React.FunctionComponent<BlockDetailsProps> = ({ block, network }) => {
  const { hash, ethTxHash, dataRoot, proofData, nullifierRoot, created } = block;

  const summaryNode = (
    <BlockSummary title="Block Header">
      <InfoRow title="TIMESTAMP">
        {!!ethTxHash && (
          <TimestampRoot>
            <Timestamp time={created} />
            <EtherScanLink href={getEtherscanLink(network, ethTxHash)} target="_blank">
              <EtherScanIcon src={etherscanIcon} />
            </EtherScanLink>
          </TimestampRoot>
        )}
        {!ethTxHash && 'Pending...'}
      </InfoRow>
      <InfoRow title="BLOCK HASH">{<HashValue value={`0x${hash}`} />}</InfoRow>
      <InfoRow title="DATA ROOT">
        <HashValue value={`0x${dataRoot}`} />
      </InfoRow>
      <InfoRow title="NULLIFIER ROOT">
        {nullifierRoot ? <HashValue value={`0x${nullifierRoot}`} /> : <Value text="0x" />}
      </InfoRow>
    </BlockSummary>
  );

  return (
    <DetailsSection
      lhsContent={summaryNode}
      rhsContent={proofData ? <ProofData proofData={`0x${proofData}`} /> : <ProofDataPlaceholder />}
    />
  );
};
