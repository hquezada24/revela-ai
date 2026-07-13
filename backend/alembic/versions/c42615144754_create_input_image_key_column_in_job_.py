"""Create input_image_key column in Job table

Revision ID: c42615144754
Revises: d9da97331454
Create Date: 2026-07-12 14:09:11.305922

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers
revision: str = "c42615144754"
down_revision: Union[str, Sequence[str], None] = "d9da97331454"
branch_labels = None
depends_on = None

def upgrade() -> None:
    op.add_column(
        "job",
        sa.Column(
            "input_image_keys",
            postgresql.ARRAY(sa.String()),
            nullable=True,
        ),
    )

def downgrade() -> None:
    op.drop_column("job", "input_image_keys")