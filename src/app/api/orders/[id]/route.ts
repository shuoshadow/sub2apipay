import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// 仅返回订单状态相关字段，不暴露任何用户隐私信息
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    select: {
      id: true,
      status: true,
      expiresAt: true,
    },
  });

  if (!order) {
    return NextResponse.json({ error: '订单不存在' }, { status: 404 });
  }

  return NextResponse.json({
    id: order.id,
    status: order.status,
    expiresAt: order.expiresAt,
  });
}
