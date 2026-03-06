package com.methil.aiko.ui.components.message

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.methil.aiko.R
import com.methil.aiko.ui.theme.*

@Composable
fun Y2kInputArea(
    text: String,
    onInputClick: () -> Unit,
    onSend: () -> Unit
) {
    Surface(
        modifier = Modifier
            .fillMaxWidth()
            .height(80.dp),
        color = Color.White,
        border = BorderStroke(1.dp, Color.LightGray)
    ) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(8.dp)
        ) {
            Row(
                modifier = Modifier
                    .fillMaxSize()
                    .border(BorderStroke(2.dp, LightViolet), RoundedCornerShape(4.dp))
                    .padding(4.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .fillMaxHeight()
                        .background(Color(0xFFF0F0F0))
                        .clickable { onInputClick() }
                        .padding(horizontal = 16.dp),
                    contentAlignment = Alignment.CenterStart
                ) {
                    Text(
                        text = if (text.isEmpty()) "Aikoと話す" else text,
                        color = if (text.isEmpty()) Color.Gray else DarkPurple,
                        fontSize = 16.sp
                    )
                }
                IconButton(onClick = onSend) {
                    Icon(
                        painter = painterResource(id = R.drawable.send_ico),
                        contentDescription = "Send",
                        tint = DarkPurple,
                        modifier = Modifier.size(24.dp)
                    )
                }
            }
        }
    }
}
