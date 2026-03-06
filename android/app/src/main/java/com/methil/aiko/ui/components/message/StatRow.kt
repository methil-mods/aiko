package com.methil.aiko.ui.components.message

import androidx.compose.foundation.layout.*
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.methil.aiko.ui.theme.DarkPurple

@Composable
fun StatRow(label: String, iconUrl: String) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            text = label,
            color = DarkPurple,
            fontSize = 10.sp,
            fontWeight = FontWeight.Bold,
            modifier = Modifier.width(30.dp)
        )
        Spacer(modifier = Modifier.width(4.dp))
        // Progress bar container
        Box(
            modifier = Modifier
                .weight(1f)
                .height(12.dp)
        ) {
            // Fill should be dynamic but static for now
            Box(
                modifier = Modifier
                    .fillMaxHeight()
                    .fillMaxWidth(0.7f)
                    .padding(vertical = 2.dp)
            )
            AsyncImage(
                model = iconUrl,
                contentDescription = null,
                modifier = Modifier.size(14.dp)
            )
        }
    }
}
